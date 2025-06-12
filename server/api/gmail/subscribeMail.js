import nodemailer from 'nodemailer'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body
  const { gmailAppPassword } = useRuntimeConfig()

  function contentHtml() {
    return `
    <html>
      <head>
        <style></style>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
        <table style="padding-bottom: 20px;" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <!-- Logo 或 Banner 圖片 -->
              <img src="https://yt3.googleusercontent.com/AEp17BZDLVya8WC6a66xOcy2Y-CdlgYuaPEuhD4ULLKbWiKRAAbUn44pvqfjOcf7OLSRRTALqA=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="秋天剩旅行 Banner" width="600" style="max-width: 90%; border-radius: 10px;">
            </td>
          </tr>
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); padding: 30px; max-width: 90%;">
                <tr>
                  <td style="font-size: 20px; color: #333333; text-align: center;">
                    <strong>歡迎加入《秋天剩旅行》🌲 一起動起來吧！</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 16px; color: #555555; padding: 20px 0; line-height: 1.8;">
                    哈囉～歡迎你的加入！<br>
                    你已經正式加入《秋天剩旅行》的冒險小隊啦 ✨<br>
                    接下來，你會收到我們精心準備的內容，包括：
                    <ul style="list-style: none;">
                      <li>🌄 最新影片與冒險故事</li>
                      <li>🎒 專業戶外裝備與路線推薦</li>
                      <li>🎁 訂閱會員限定優惠</li>
                      <li>💡 與品牌合作的第一手消息</li>
                    </ul>
                    <br>
                    不論你喜歡登山、越野跑、攀岩還是潛水，這裡都有你會愛上的節奏與挑戰！
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <!-- 行動按鈕 -->
                    <a href="https://danny-gmfm.vercel.app/" target="_blank" style="display: inline-block; background-color: #4CAF50; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                      👉 立刻開始探索
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #777777; text-align: center; padding-top: 30px;">
                    想許願主題、合作提案、閒聊交朋友？<br>
                    歡迎隨時回信給我們，我們超愛認識新夥伴 💌
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 30px;">
                    <!-- 社群連結 -->
                    <a href="https://www.instagram.com/danny_gmfm" target="_blank" style="margin: 0 10px;">
                      <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" width="32" style="vertical-align: middle;">
                    </a>
                    <a href="https://www.facebook.com/DannyGMFM" target="_blank" style="margin: 0 10px;">
                      <img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook" width="32" style="vertical-align: middle;">
                    </a>
                    <a href="https://www.youtube.com/@danny_gmfm/about" target="_blank" style="margin: 0 10px;">
                      <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" width="32" style="vertical-align: middle;">
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: #aaaaaa; text-align: center; padding-top: 40px;">
                    © 2025 秋天剩旅行 All rights reserved.<br>
                    <a href="https://yourwebsite.com/unsubscribe" target="_blank" style="color: #aaaaaa; text-decoration: underline;">取消訂閱</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ctstravel01@gmail.com',
      pass: gmailAppPassword
    }
  })

  const mailOptions = {
    from: '"秋天剩旅行" <ctstravel01@gmail.com>',
    to: email,
    subject: '歡迎加入《秋天剩旅行》探險者行列！🌿⛰️',
    html: contentHtml()
  }

  const sendMail = await transporter.sendMail(mailOptions)

  return {
    status: sendMail
  }
})
