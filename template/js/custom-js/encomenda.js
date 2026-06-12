/**
 * Formulário de "Solicitar encomenda".
 *
 * Diferente do "avise-me" (que só avisa quando o item volta ao estoque),
 * este formulário serve para o cliente SOLICITAR a compra/encomenda de um item
 * diretamente conosco, para que possamos pedir ao fornecedor.
 *
 * O widget aparece num botão fixo no canto da tela e abre um painel com o
 * formulário sempre que:
 *   - uma busca não retorna nenhum resultado, ou
 *   - um produto (ou a variação selecionada) está esgotado.
 *
 * O item desejado é conferido em tempo real na iTunes Search API (gratuita,
 * sem chave, via JSONP) — ideal para conferir lançamentos de discos/vinis.
 */

/* ===================== CONFIGURAÇÃO ===================== */

// TODO: confirme/ajuste o e-mail que vai RECEBER os pedidos de encomenda.
const ENCOMENDA_EMAIL = 'aurelio@vapordiscos.com.br'

const SENDMAIL_URL =
  'https://us-central1-marketingtools-ecomplus.cloudfunctions.net/app/alpix/apx_sendmail'

// Todos os textos visíveis ficam em encomenda-texts.json para edição fácil.
const T = require('./encomenda-texts.json')

/* ======================================================= */

if (typeof ENCOMENDA_EMAIL !== 'string' || !ENCOMENDA_EMAIL.includes('@')) {
  console.warn('[encomenda] ENCOMENDA_EMAIL não configurado em encomenda.js')
}

let widgetEl = null
let verifiedRef = null
let itunesTimer = null

/**
 * Envia o e-mail usando a estrutura combinada (axios global, com fallback
 * para fetch caso o axios não esteja disponível no bundle).
 */
function postMail (mail) {
  const payload = {
    storeId: (window.storefront && storefront.settings && storefront.settings.store_id) || undefined,
    destination: mail.destination,
    subject: mail.subject,
    content: mail.body,
    reply_mail: mail.replyTo
  }

  const onSuccess = (response) => {
    const data = (response && response.data) || {}
    alert(data.msg || T.alertSuccess)
    if (!data.error && mail.form) {
      mail.form
        .find('input[type="text"],input[type="email"],textarea,input[type="tel"]')
        .val('')
      verifiedRef = null
      mail.form.find('.encomenda__suggestions').empty().hide()
      mail.form.find('.encomenda__verified').empty().hide()
    }
    return data
  }

  if (typeof window.axios !== 'undefined') {
    return window.axios.post(SENDMAIL_URL, payload)
      .then(onSuccess)
      .catch((err) => {
        console.error('[encomenda]', err)
        alert(T.alertError)
      })
  }

  // Fallback sem axios
  return fetch(SENDMAIL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => res.json())
    .then((data) => onSuccess({ data }))
    .catch((err) => {
      console.error('[encomenda]', err)
      alert(T.alertError)
    })
}

/**
 * Conferência do item na iTunes Search API via JSONP (gratuito, sem CORS).
 */
function searchReleases (term, callback) {
  const cbName = '__encomendaItunes' + Date.now()
  const script = document.createElement('script')
  let done = false

  const cleanup = () => {
    delete window[cbName]
    if (script.parentNode) script.parentNode.removeChild(script)
  }

  window[cbName] = (data) => {
    done = true
    cleanup()
    callback((data && data.results) || [])
  }

  script.onerror = () => {
    if (!done) {
      cleanup()
      callback([])
    }
  }

  script.src =
    'https://itunes.apple.com/search' +
    '?media=music&entity=album&limit=5' +
    '&term=' + encodeURIComponent(term) +
    '&callback=' + cbName

  document.head.appendChild(script)
}

function renderSuggestions (results) {
  const $box = widgetEl.find('.encomenda__suggestions')
  $box.empty()
  if (!results.length) {
    $box.hide()
    return
  }
  results.forEach((r) => {
    const year = r.releaseDate ? new Date(r.releaseDate).getFullYear() : ''
    const label = r.artistName + ' — ' + r.collectionName + (year ? ' (' + year + ')' : '')
    const art = (r.artworkUrl60 || r.artworkUrl100 || '').replace('100x100', '60x60')
    const $item = $(
      '<button type="button" class="encomenda__suggestion">' +
        (art ? '<img src="' + art + '" alt="" />' : '') +
        '<span>' + label + '</span>' +
      '</button>'
    )
    $item.on('click', () => {
      widgetEl.find('[name="item"]').val(label)
      verifiedRef = {
        label,
        url: r.collectionViewUrl || '',
        artist: r.artistName,
        album: r.collectionName,
        year
      }
      const $verified = widgetEl.find('.encomenda__verified')
      $verified
        .html('<i class="i-check-circle"></i> ' + T.verifiedPrefix + ' <strong>' + label + '</strong>')
        .show()
      $box.empty().hide()
    })
    $box.append($item)
  })
  $box.show()
}

function onItemInput () {
  verifiedRef = null
  widgetEl.find('.encomenda__verified').empty().hide()
  const term = widgetEl.find('[name="item"]').val().trim()
  clearTimeout(itunesTimer)
  if (term.length < 3) {
    widgetEl.find('.encomenda__suggestions').empty().hide()
    return
  }
  itunesTimer = setTimeout(() => {
    searchReleases(term, renderSuggestions)
  }, 450)
}

function buildBody (data) {
  const m = T.mail
  const lines = [
    '<h3>' + m.heading + '</h3>',
    '<p><strong>' + m.labelName + '</strong> ' + escapeHtml(data.name) + '</p>',
    '<p><strong>' + m.labelEmail + '</strong> ' + escapeHtml(data.email) + '</p>',
    '<p><strong>' + m.labelPhone + '</strong> ' + escapeHtml(data.phone) + '</p>',
    '<p><strong>' + m.labelItem + '</strong> ' + escapeHtml(data.item) + '</p>'
  ]
  if (verifiedRef) {
    lines.push(
      '<p><strong>' + m.labelVerified + '</strong> ' +
        escapeHtml(verifiedRef.label) +
        (verifiedRef.url ? ' — <a href="' + verifiedRef.url + '">' + m.verifiedLink + '</a>' : '') +
      '</p>'
    )
  }
  if (data.notes) {
    lines.push('<p><strong>' + m.labelNotes + '</strong><br>' + escapeHtml(data.notes).replace(/\n/g, '<br>') + '</p>')
  }
  lines.push('<hr><p><small>' + m.labelOrigin + ' ' + escapeHtml(data.origin) +
    '<br>' + m.labelPage + ' ' + window.location.href + '</small></p>')
  return lines.join('\n')
}

function escapeHtml (str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function onSubmit (e) {
  e.preventDefault()
  const $form = widgetEl.find('form')
  const data = {
    name: $form.find('[name="name"]').val().trim(),
    email: $form.find('[name="email"]').val().trim(),
    phone: $form.find('[name="phone"]').val().trim(),
    item: $form.find('[name="item"]').val().trim(),
    notes: $form.find('[name="notes"]').val().trim(),
    origin: widgetEl.attr('data-origin') || 'site'
  }

  if (!data.name || !data.email || !data.item) {
    alert(T.alertRequired)
    return
  }

  const $btn = $form.find('button[type="submit"]')
  const original = $btn.text()
  $btn.prop('disabled', true).text(T.sending)

  postMail({
    destination: ENCOMENDA_EMAIL,
    replyTo: data.email,
    subject: T.mail.subjectPrefix + data.item,
    body: buildBody(data),
    form: $form
  }).finally(() => {
    $btn.prop('disabled', false).text(original)
  })
}

function injectStyles () {
  if (document.getElementById('encomenda-styles')) return
  const css = `
  
  `
  const style = document.createElement('style')
  style.id = 'encomenda-styles'
  style.textContent = css
  document.head.appendChild(style)
}

function buildWidget () {
  if (widgetEl) return
  injectStyles()
  const html = `
  <div id="encomenda-widget">
    <button type="button" class="encomenda__launcher">
      <i class="i-shopping-bag"></i> ${T.launcher}
    </button>
    <div class="encomenda__panel">
      <div class="encomenda__header">
        <div>
          <h4>${T.title}</h4>
          <p>${T.subtitle}</p>
        </div>
        <button type="button" class="encomenda__close" aria-label="${T.close}">&times;</button>
      </div>
      <form novalidate>
        <label>${T.labelName}</label>
        <input type="text" name="name" autocomplete="name" required>

        <label>${T.labelEmail}</label>
        <input type="email" name="email" autocomplete="email" required>

        <label>${T.labelPhone}</label>
        <input type="tel" name="phone" autocomplete="tel">

        <label>${T.labelItem}</label>
        <div class="encomenda__field">
          <input type="text" name="item" autocomplete="off" required>
          <div class="encomenda__verified"></div>
          <div class="encomenda__suggestions"></div>
        </div>

        <label>${T.labelNotes}</label>
        <textarea name="notes" placeholder="${T.notesPlaceholder}"></textarea>

        <button type="submit" class="encomenda__submit">${T.submit}</button>
      </form>
    </div>
  </div>`

  $('body').append(html)
  widgetEl = $('#encomenda-widget')

  widgetEl.find('.encomenda__launcher').on('click', () => widgetEl.addClass('is-open'))
  widgetEl.find('.encomenda__close').on('click', () => widgetEl.removeClass('is-open'))
  widgetEl.find('[name="item"]').on('input', onItemInput)
  widgetEl.find('form').on('submit', onSubmit)
}

/**
 * Mostra o widget. origin = 'busca' | 'produto'. Pré-preenche o item.
 * autoOpen abre o painel direto (senão fica só o botão no canto).
 */
function showWidget (origin, prefillItem, autoOpen) {
  buildWidget()
  widgetEl.attr('data-origin', origin).addClass('is-active')
  if (prefillItem && !widgetEl.find('[name="item"]').val()) {
    widgetEl.find('[name="item"]').val(prefillItem)
  }
  if (autoOpen) {
    widgetEl.addClass('is-open')
  }
}

// Abre o popup a partir de um clique. Exposto globalmente para os componentes
// Vue (TheProduct: produto esgotado; SearchEngine: busca sem resultado).
window.openEncomenda = function (origin, prefillItem) {
  showWidget(origin || 'produto', prefillItem, true)
}

// Textos disponíveis para os templates Vue (ex.: rótulo do botão na busca).
window.encomendaTexts = T
