/* eslint-disable camelcase */
export default function (code_category, code_area, code_relatedTopic) {
  const code_video_category = [
    {
      id: '1',
      value: '台灣百岳',
      value_en: 'top_mountains_tw'
    },
    {
      id: '2',
      value: '中級山/郊山步道/野營/野溪溫泉',
      value_en: 'outdoor_spot'
    },
    {
      id: '3',
      value: '相關主題',
      value_en: 'related_topic'
    }
  ]

  const code_video_area = [
    {
      id: '1',
      value: '北部',
      value_en: 'north'
    },
    {
      id: '2',
      value: '中部',
      value_en: 'middle'
    },
    {
      id: '3',
      value: '南部',
      value_en: 'south'
    },
    {
      id: '4',
      value: '東部',
      value_en: 'east'
    }
  ]

  const code_video_relatedTopic = [
    {
      id: '1',
      value: '裝備評測',
      value_en: 'device_evaluation'
    },
    {
      id: '2',
      value: '品牌介紹',
      value_en: 'brand_intro'
    },
    {
      id: '3',
      value: '潛水、攀岩',
      value_en: 'diving_and_climbing'
    },
    {
      id: '4',
      value: '環保響應',
      value_en: 'going_green'
    },
    {
      id: '5',
      value: '國外山岳',
      value_en: 'foreign_mountain'
    },
    {
      id: '6',
      value: '其他',
      value_en: 'others'
    }
  ]

  const videoPath = (code_category, code_area, code_relatedTopic) => {
    const category = code_video_category.filter((item) => item.id === code_category)[0].value_en

    const area = code_video_area.filter((item) => item.id === code_area)[0]?.value_en
    const relatedTopic = code_video_relatedTopic.filter((item) => item.id === code_relatedTopic)[0]
      ?.value_en

    if (code_category === '3') {
      return `/video/${category}/${relatedTopic}`
    } else {
      return `/video/${category}/${area}`
    }
  }

  return {
    videoPath,
    code_video_category,
    code_video_area,
    code_video_relatedTopic
  }
}
