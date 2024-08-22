import getSections from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/sections'
import getSettings from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/settings'
import getLayout from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/layout'
import getPages from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/pages'
import getBlogPosts from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/blog-posts'
import getExtraPages from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/extra-pages'
import getWidgets from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/widgets'

//ALPIX CUSTOM MODULES
const animations = [
  "backInDown",
  "backInLeft",
  "backInRight",
  "backInUp",
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "fadeInTopLeft",
  "fadeInTopRight",
  "fadeInBottomLeft",
  "fadeInBottomRight",
  "lightSpeedInRight",
  "lightSpeedInLeft",
  "lightSpeedOutRight",
  "lightSpeedOutLeft",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp"
]


const spacer = [
  {
    label: 'Visível em...',
    name: 'visibility',
    widget: 'select',
    required: false,
    default:'d-block d-md-block',
    options: [
      {
        label: 'Todos os ambientes',
        value: "d-block d-md-block"
      },
      {
        label: 'Apenas Desktop',
        value: "d-none d-md-block"
      },
      {
        label: 'Apenas Mobile',
        value: "d-block d-md-none"
      },
    ]
  },
  {
    label: 'Espaçamento da Sessão',
    name: 'spacing',
    widget: 'object',
    fields: [
      {
        label: 'Container',
        required: false,
        name: 'container',
        widget: 'select',
        options: ["container","container-fluid","container_90"]
      },
      {
        label: 'Desktop',
        name: 'desktop',
        widget: 'object',
        required: false,
        fields: [
          {
            label: 'Margem Superior',
            
            name: 'margin_top',
            widget: 'select',
            required: false,
            options: ["0","1","2","3","4","5"]
          },  
          {
            label: 'Margem Inferior',
            
            name: 'margin_bottom',
            widget: 'select',
            required: false,
            options: ["0","1","2","3","4","5"]
          },  
          {
            label: 'Espaçamento Superior',
            
            name: 'padding_top',
            widget: 'select',
            required: false,
            options: ["0","1","2","3","4","5"]
          },  
          {
            label: 'Espaçamento Inferior',
            
            name: 'padding_bottom',
            widget: 'select',
            required: false,
            options: ["0","1","2","3","4","5"]
          },
        ]
      },
      {
        label: 'Mobile',
        name: 'mobile',
        widget: 'object',
        required: false,
        fields: [
          {
            label: 'Margem Superior',
            name: 'margin_top',
            widget: 'select',
            required: false,
            options: ["0","1","2","3","4","5"]
          },  
          {
            label: 'Margem Inferior',
            
            name: 'margin_bottom',
            widget: 'select',
            required: false,
            options: ["0","1","2","3","4","5"]
          },  
          {
            label: 'Espaçamento Superior',
            
            name: 'padding_top',
            widget: 'select',
            required: false,
            options: ["0","1","2","3","4","5"]
          },  
          {
            label: 'Espaçamento Inferior',
            
            name: 'padding_bottom',
            widget: 'select',
            required: false,
            options: ["0","1","2","3","4","5"]
          },
        ]
      },
    ]
  }, 
];

const bannerFields = [
  {
    label: 'Desktop',
    name: 'desktop',
    widget: 'object',
    required: false,
    fields: [
      {
        label: 'Imagem',
        name: 'img',
        widget: 'image'
      },
      {
        label: 'Link',
        required: false,
        name: 'link',
        widget: 'string'
      },
      {
        label: 'Alt',
        required: false,
        name: 'alt',
        widget: 'string'
      },
      
      {
        label: 'Título',
        required: false,
        name: 'title',
        widget: 'string'
      },
      {
        label: 'Cor do título',
        required: false,
        name: 'title_color',
        widget: 'color'
      },
      {
        label: 'Descrição',
        required: false,
        name: 'description',
        widget: 'string'
      },
      
      {
        label: 'Cor da descrição',
        required: false,
        name: 'description_color',
        widget: 'color'
      },
      
      {
        label: 'Transparência da Máscara',
        name: 'mask_opacity',
        hint: 'De 0 até 10. 0 é transparente e 10 é totalmente opaco.',
        required: false,
        min: 0,
        max:10,
        default:0,    
        widget: 'number'
      },
      {
        label: 'Cor da Máscara',
        required: false,
        name: 'mask_color',
        widget: 'color'
      },      
      {
        label: 'Posição do conteúdo',
        required: false,
        name: 'content_position',
        widget: 'select',
        options: ["top_left","top_center","top_right","center_left","center_center","center_right","bottom_left","bottom_center","bottom_right"]
      },
      {
        label: 'Ordem de conteúdo',
        required: false,
        name: 'content_order',
        widget: 'select',
        options: ["before_image","inside_image","after_image","left_image","right_image"]
      },  
      {
        label: 'Animação',
        required: false,
        name: 'animate',
        widget: 'select',
        options: animations
      },
      {
        label: 'Texto do botão [Principal]',
        required: false,
        name: 'btn_text',
        widget: 'string'
      },
      {
        label: 'URL do botão [Principal]',
        required: false,
        name: 'btn_url',
        widget: 'string'
      },
      {
        label: 'Cor do texto do botão [Principal]',
        required: false,
        name: 'btn_text_color',
        widget: 'color'
      },
      {
        label: 'Cor de fundo do botão [Principal]',
        required: false,
        name: 'btn_background',
        widget: 'color'
      },      
      
      {
        label: 'Texto do botão [Secundário]',
        required: false,
        name: 'btn_text_2',
        widget: 'string'
      },
      
      {
        label: 'URL do botão [Secundário]',
        required: false,
        name: 'btn_url_2',
        widget: 'string'
      },
      {
        label: 'Cor do texto do botão [Secundário]',
        required: false,
        name: 'btn_text_color_2',
        widget: 'color'
      },
      {
        label: 'Cor do fundo do botão [Secundário]',
        required: false,
        name: 'btn_background_2',
        widget: 'color'
      },      
      
    ]
  },
  {
    label: 'Mobile',
    name: 'mobile',
    widget: 'object',
    required: false,
    fields: [
      {
        label: 'Imagem',
        name: 'img',
        widget: 'image',
        required:false
      },
      {
        label: 'Link',
        required: false,
        name: 'link',
        widget: 'string'
      },
      {
        label: 'Alt',
        required: false,
        name: 'alt',
        widget: 'string'
      },
      
      {
        label: 'Título',
        required: false,
        name: 'title',
        widget: 'string'
      },
      {
        label: 'Cor do título',
        required: false,
        name: 'title_color',
        widget: 'color'
      },
      {
        label: 'Descrição',
        required: false,
        name: 'description',
        widget: 'string'
      },
      
      {
        label: 'Cor da descrição',
        required: false,
        name: 'description_color',
        widget: 'color'
      },
      
      {
        label: 'Transparência da Máscara',
        name: 'mask_opacity',
        hint: 'De 0 até 10. 0 é transparente e 10 é totalmente opaco.',
        min: 0,
        max:10,
        default:0,    
        widget: 'number',
        required: false,
      },
      {
        label: 'Cor da Máscara',
        required: false,
        name: 'mask_color',
        widget: 'color'
      },      
      {
        label: 'Posição do conteúdo',
        required: false,
        name: 'content_position',
        widget: 'select',
        options: ["top_left","top_center","top_right","center_left","center_center","center_right","bottom_left","bottom_center","bottom_right"]
      },
      {
        label: 'Ordem de conteúdo',
        required: false,
        name: 'content_order',
        widget: 'select',
        options: ["before_image","inside_image","after_image","left_image","right_image"]
      },  
      {
        label: 'Animação',
        required: false,
        name: 'animate',
        widget: 'select',
        options: animations
      },
      {
        label: 'Texto do botão [Principal]',
        required: false,
        name: 'btn_text',
        widget: 'string'
      },
      {
        label: 'URL do botão [Principal]',
        required: false,
        name: 'btn_url',
        widget: 'string'
      },
      {
        label: 'Cor do texto do botão [Principal]',
        required: false,
        name: 'btn_text_color',
        widget: 'color'
      },
      {
        label: 'Cor de fundo do botão [Principal]',
        required: false,
        name: 'btn_background',
        widget: 'color'
      },      
      
      {
        label: 'Texto do botão [Secundário]',
        required: false,
        name: 'btn_text_2',
        widget: 'string'
      },
      
      {
        label: 'URL do botão [Secundário]',
        required: false,
        name: 'btn_url_2',
        widget: 'string'
      },
      {
        label: 'Cor do texto do botão [Secundário]',
        required: false,
        name: 'btn_text_color_2',
        widget: 'color'
      },
      {
        label: 'Cor do fundo do botão [Secundário]',
        required: false,
        name: 'btn_background_2',
        widget: 'color'
      },            
    ]
  }
]


export default options => {
  options.sections = getSections(options).concat([
    {
      label: '[ALPIX] - Banner Responsivo',
      name: 'apx_responsive-banner',
      widget: 'object',
      fields: [
        ...spacer,
        ...bannerFields]
    },
    {
      label: '[ALPIX] - Lista de Produtos',
      name: 'apx_productList_A',
      widget: 'object',
      fields: [
        {
          label: 'Logotipo',
          name: 'title_img',
          widget: 'image'
        },
        {
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Descrição',
          required: false,
          name: 'description',
          widget: 'text'
        },
        {
          label: 'Imagem Sessão',
          name: 'section_img',
          widget: 'image'
        },        
        {
          label: 'Imagem Sessão - Mobile',
          name: 'section_img_m',
          widget: 'image'
        },
        {
          label: 'Margem da Imagem (px)',
          required: false,
          name: 'imagem_margin',
          widget: 'string'
        },        
        {
          label: 'Formato',
          required: true,
          name: 'section_type',
          widget: 'select',
          options: [
            {label:"Texto Esquerda - Imagem Direita - Produtos Abaixo", value:1},
            {label:"Texto Direita - Imagem Esquerda - Produtos Abaixo", value:2},
            {label:"Texto e Imagem Direita - Produtos Esquerda", value:3},
            {label:"Texto e Imagem Esquerda - Produtos Direita", value:4},
          ]
        },        
        {
          label: "Cor do Título",
          name: "title_color",
          widget: "color"
        },
        {
          label: "Cor do Texto",
          name: "txt_color",
          widget: "color"
        },
        {
          label: "Cor do Fundo",
          name: "bg_color",
          widget: "color"
        },
        {
          label: "Cor do Botão",
          name: "btn_color",
          widget: "color"
        },
        {
          label: "Fundo do Botão",
          name: "btn_bg",
          widget: "color"
        },
        {
          label: 'Produtos',
          name: 'products',
          widget: 'list',
          field: {
            label: 'SKU do produto',
            name: 'product_id',
            widget: 'select',
            options: options.state.routes
              .filter(({ sku }) => typeof sku === 'string')
              .map(({ _id, sku }) => ({
                label: sku,
                value: _id
              }))
          }
        },
        ...spacer]
    },
    // {
    //   label: '[ALPIX] - Tarja de Vantagens',
    //   name: 'apx_banners-stripe',
    //   widget: 'object',
    //   fields: [
    //     {
    //       label: 'Cor do título',
    //       required: false,
    //       name: 'title_color',
    //       widget: 'color'
    //     },
    //     {
    //       label: 'Cor da descrição',
    //       required: false,
    //       name: 'description_color',
    //       widget: 'color'
    //     },
    //     {
    //       label: 'Animado',
    //       required: false,
    //       name: 'animation',
    //       widget: 'boolean',
    //       default:false
    //     },
    //     {
    //       label: 'Lista',
    //       name: 'list',
    //       widget: 'list',
    //       fields: [
    //         {
    //           label: 'Imagem',
    //           name: 'img',
    //           widget: 'image'
    //         },
    //         {
    //           label: 'Link',
    //           required: false,
    //           name: 'link',
    //           widget: 'string'
    //         },
    //         {
    //           label: 'Título',
    //           required: false,
    //           name: 'title',
    //           widget: 'string'
    //         },
            
    //         {
    //           label: 'Descrição',
    //           required: false,
    //           name: 'description',
    //           widget: 'string'
    //         },
            
    //       ]
    //     }
    //   ]
    // },
    // {
    //   label: '[ALPIX] - Grid de Banners',
    //   name: 'apx_banners-grid',
    //   widget: 'object',
    //   fields: [
          
    //     ...spacer, 
    //     {
    //       label: 'Formato',
    //       required: true,
    //       name: 'grid',
    //       widget: 'select',
    //       hint:'12 é a medida referente a um banner de ponta a ponta',
    //       options: [
    //         {
    //           label: '[12]',
    //           value: "1"
    //         },
    //         {
    //           label: '[6][6]',
    //           value: "2"
    //         },
    //         {
    //           label: '[8][4]',
    //           value: "3"
    //         },
    //         {
    //           label: '[4][8]',
    //           value: "4"
    //         },
    //         {
    //           label: '[4][4][4]',
    //           value: "5"
    //         },            
    //       ]
    //     }, 
    //     {
    //       label: 'Ao exceder quantidade limite',
    //       required: true,
    //       name: 'breakline',
    //       widget: 'select',
    //       options: [
    //         {
    //           label: 'Rolar lateralmente',
    //           value: "true"
    //         },
    //         {
    //           label: 'Quebrar linha',
    //           value: "false"
    //         },
    //       ]
    //     },  
    //     {
    //       label: 'Banners',
    //       name: 'banners',
    //       widget: 'list',
    //       fields: bannerFields
    //     }
    //   ]
    // },
    // {
    //   label: '[ALPIX] - Lista de Itens com Imagens',
    //   name: 'apx_list-images',
    //   widget: 'object',
    //   fields: [
    //     ...spacer, 
    //     {
    //       label: 'Título da Sessão',
    //       required: false,
    //       name: 'title',
    //       widget: 'string'
    //     },
    //     {
    //       label: 'Descrição',
    //       required: false,
    //       name: 'description',
    //       widget: 'string'
    //     },
    //     {
    //       label: 'Link da Sessão',
    //       required: false,
    //       name: 'link',
    //       widget: 'string'
    //     },        
    //     {
    //       label: 'Itens',
    //       name: 'banners',
    //       widget: 'list',
    //       fields: [
    //         {
    //           label: 'Título',
    //           required: false,
    //           name: 'title',
    //           widget: 'string'
    //         },                     
    //         {
    //           label: 'Link',
    //           required: false,
    //           name: 'link',
    //           widget: 'string'
    //         },
    //         {
    //           label: 'Imagem',
    //           name: 'img',
    //           widget: 'image'
    //         }
            
    //       ]
    //     }
    //   ]
    // },
    // {
    //   label: '[ALPIX] - Linha de Banners',
    //   name: 'apx_banner-line',
    //   widget: 'object',
    //   fields: [
    //     ...spacer, 
    //     {
    //       label: 'Título da Sessão',
    //       required: false,
    //       name: 'title',
    //       widget: 'string'
    //     },
    //     {
    //       label: 'Descrição',
    //       required: false,
    //       name: 'description',
    //       widget: 'string'
    //     },
    //     {
    //       label: 'Banners',
    //       name: 'banners',
    //       widget: 'list',
    //       fields: bannerFields
    //     }
    //   ]
    // },
    {
      label: '[ALPIX] - Slider de Banners',
      name: 'apx_banner-slider',
      widget: 'object',
      fields: [
        ...spacer, 
        {
          label: 'Slides',
          name: 'slides',
          widget: 'list',
          fields: bannerFields.concat([
            {
              label: 'Data de início',
              required: false,
              name: 'start',
              widget: 'datetime',
              dateFormat: 'DD/MM/YYYY',
              timeFormat: 'HH:mm'
            },
            {
              label: 'Data de encerramento',
              required: false,
              name: 'end',
              widget: 'datetime',
              dateFormat: 'DD/MM/YYYY',
              timeFormat: 'HH:mm'
            }
          ])
        },
        {
          label: 'Slider autoplay',
          name: 'autoplay',
          hint: 'Exibição de cada slide em milisegundos, defina 0 para desabilitar autoplay',
          min: 0,
          step: 1000,
          default: 9000,
          widget: 'number'
        }
      ]
    },
    // {
    //   label: '[ALPIX] - Blog - Share',
    //   name: 'apx_blog-share',
    //   widget: 'object',
    //   fields: [
    //     {
    //       label: 'Ativo',
    //       required: false,
    //       name: 'enabled',
    //       widget: 'boolean',
    //       default:false
    //     }        
    //   ]
    // }
    
])

  return {
    backend: {
      name: 'git-gateway',
      branch: 'master',
      commit_messages: {
        create: 'Create {{collection}} “{{slug}}”',
        update: 'Update {{collection}} “{{slug}}”',
        delete: 'Delete {{collection}} “{{slug}}”',
        uploadMedia: 'Upload “{{path}}”',
        deleteMedia: '[skip ci] Delete “{{path}}”',
        openAuthoring: '{{message}}'
      }
    },
    logo_url: 'https://ecom.nyc3.digitaloceanspaces.com/storefront/cms.png',
    locale: 'pt',
    load_config_file: Boolean(window.CMS_LOAD_CONFIG_FILE),
    media_folder: `${options.baseDir}template/public/img/uploads`,
    public_folder: '/img/uploads',
    slug: {
      encoding: 'ascii',
      clean_accents: true,
      sanitize_replacement: '-'
    },
    collections: [
      getSettings(options),
      getLayout(options),
      getPages(options),
      getBlogPosts(options),
      //getReceitas(options),
      //getGrids(options),
      //getMenuConfig(options),
      getExtraPages(options),
      getWidgets(options),
      {
        name: 'apx_categories',        
        label: '[alpix.dev] - Categorias',
        description: 'Adicione blocos de conteúdo em categorias especificas',
        folder: `${options.baseDir}content/apx_categories`,
        extension: 'json',
        create: true,
        slug: '{{slug}}',
        fields: [
          {
            label: "Título",
            hint:"Apenas para identificação no painel",
            name: "title",
            widget: "string"          
          },
          {
            label: 'Identificador',
            name: 'category_id',
            widget: 'select',
                multiple: false,
                options: [
                  ...options.state.routes
                  .filter(el => el.resource === 'categories')
                  .map((el) => ({
                    label: 'Categoria - ' + el.name,
                    value: el._id
                  }))
                ]                
          },
          {
            label: 'Seções',
            name: 'sections',
            widget: 'list',
            types: options.sections
          }
        ]
      },
      {
        name: 'apx_tags',        
        label: '[alpix.dev] - Produtos - Tags ',
        description: 'Adicione tags ou selos nos produtos',
        folder: `${options.baseDir}content/apx_tags`,
        extension: 'json',
        create: true,
        slug: '{{slug}}',
        fields: [
          {
            label: 'Identificador [SKU] ou [Categoria]',
            name: 'identificador',
            widget: 'select',
                multiple: true,
                options: [
                  ...options.state.routes
                  .filter(({ sku }) => typeof sku === 'string')
                  .map(({ sku }) => ({
                    label: 'Produto - ' + sku,
                    value: sku
                  })),
                  ...options.state.routes
                  .filter(el => el.resource === 'categories')
                  .map((el) => ({
                    label: 'Categoria - ' + el.name,
                    value: 'cat_'+el._id
                  }))
                ]                
          },
          {
            label: "Nome da Característica",
            hint:"Exatamente como cadastrado no painel E-com.plus",
            name: "title",
            widget: "string"          
          }, 
          {
            label: "Descrição",
            name: "description",
            widget: "string",
            required:false,          
          }, 
          {
            label: 'Imagem ou ícone',
            name: 'img',
            widget: 'image',
            required:false,
          },   
          {
            label: 'Cor do texto',
            required: false,
            name: 'color',
            widget: 'color'
          },
          {
            label: 'Cor da borda',
            required: false,
            name: 'border',
            widget: 'color'
          },
          {
            label: 'Cor do fundo',
            required: false,
            name: 'background_color',
            widget: 'color'
          }
        ]
      },
      
      {
        label: "[alpix.dev]",
        name: "alpix",
        editor: {
            preview: false
        },
        files: [
          {
              name: "apx_header",
              label: "Cabeçalho",
              file: "content/apx_header.json",
              fields: [
                  {
                      label: "Tarja Topo (Acima)",
                      name: "topbar_1",
                      widget: "object",
                      required: false,
                      fields: [
                          {
                              label: "Cor do Texto",
                              name: "color",
                              widget: "color"
                          },
                          {
                              label: "Cor do Fundo",
                              name: "background",
                              widget: "color"
                          },
                          {
                              label: "Itens",
                              name: "topbar_1",
                              widget: "list",
                              required: false,
                              fields: [
                                  {
                                      label: "Texto ou HTML",
                                      name: "title",
                                      widget: "string"
                                  },
                                  {
                                      label: "URL",
                                      name: "url",
                                      widget: "string"
                                  }
                              ]
                          }
                      ]
                  },                  
              ]
          },
          {
              name: "popup",
              label: "Popup",
              file: "content/apx_popup.json",
              editor: {
                  preview: false
              },
              fields: [
                  {
                      label: "Imagem",
                      name: "image",
                      widget: "image",
                      required: false
                  },
                  {
                      label: "Título",
                      name: "title",
                      widget: "string"
                  },
                  {
                      label: "Texto",
                      name: "description",
                      widget: "string"
                  },
                  {
                      label: "HTML",
                      hint:"Pode ser de um formulário ou algum script qualquer",
                      name: "code",
                      widget: "code"
                  }           
              ]
          },
        ]
      }      
    ]
  }
}
