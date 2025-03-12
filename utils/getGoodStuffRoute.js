/* eslint-disable camelcase */
export default function (code_category) {
  const code_product_bigcategory = [
    {
      id: '1',
      value: '戶外裝備',
      value_en: 'outdoor'
    },
    {
      id: '2',
      value: '拍攝裝備',
      value_en: 'photography'
    }
  ]

  const code_product_smallcategory = [
    {
      id: '1',
      value: '底層',
      supertype: '1',
      value_en: 'base_layer'
    },
    {
      id: '2',
      value: '中層',
      supertype: '1',
      value_en: 'mid_layer'
    },
    {
      id: '3',
      value: '外層',
      supertype: '1',
      value_en: 'outer_layer'
    },
    {
      id: '4',
      value: '背包',
      supertype: '1',
      value_en: 'knapsack'
    },
    {
      id: '5',
      value: '褲子',
      supertype: '1',
      value_en: 'bottoms'
    },
    {
      id: '6',
      value: '配件',
      supertype: '1',
      value_en: 'accessories'
    },
    {
      id: '7',
      value: '全片幅相機',
      supertype: '2',
      value_en: 'full_frame_camera'
    },
    {
      id: '8',
      value: '運動相機',
      supertype: '2',
      value_en: 'action_camera'
    },
    {
      id: '9',
      value: '空拍機',
      supertype: '2',
      value_en: 'drone'
    },
    {
      id: '10',
      value: '相機配件',
      supertype: '2',
      value_en: 'camera_accessories'
    },
    {
      id: '11',
      value: '剪輯設備',
      supertype: '2',
      value_en: 'film_editing_equipment'
    }
  ]

  const productPath = (code_category) => {
    const smallCategoryName = code_product_smallcategory.filter(
      (item) => item.id === code_category
    )[0].value_en

    const supertype = code_product_smallcategory.filter((item) => item.id === code_category)[0]
      .supertype

    const bigCategoryName = code_product_bigcategory.filter((item) => item.id === supertype)[0]
      .value_en

    return `/goodStuff/${bigCategoryName}/${smallCategoryName}`
  }

  return {
    productPath
  }
}
