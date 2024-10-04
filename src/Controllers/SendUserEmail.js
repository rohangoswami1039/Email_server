const { sendEmail } = require("../utils/emailService");

const sendUserEmail_with_Attachment = async (req, res) => {
  const {
    email,
    name,
    heading,
    companyName,
    linkedin,
    portfolio,
    phoneNumber,
  } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333333; text-align: center;">Application for ${heading}</h2>
          
          <p style="color: #555555; line-height: 1.6;">
            <strong>Dear HR Manager,</strong>
          </p>

          <p style="color: #555555; line-height: 1.6;">
            I hope this email finds you well. My name is <strong>${name}</strong>, and I am writing to express my interest in the React Native Developer position
            ${
              companyName ? `at <strong>${companyName}</strong>` : ""
            }. I have attached my resume for your consideration.
          </p>

          <p style="color: #555555; line-height: 1.6;">
            I have experience in developing cross-platform mobile applications using <strong>React Native</strong>, as well as knowledge in <strong>React.js, Node.js, Spring Boot, Python, Next.js, and Nest.js.</strong> I am confident that my skills and enthusiasm for mobile development would make a valuable contribution to your team.
          </p>

          <p style="color: #555555; line-height: 1.6;">
            I would be grateful for the opportunity to discuss how my experience aligns with the needs of your company. Please feel free to contact me if you require any additional information or have any questions.
          </p>

          <p style="color: #555555; line-height: 1.6;">
            Thank you for your time and consideration, and I look forward to the possibility of contributing to 
            ${companyName ? `<strong>${companyName}</strong>` : "your company"}.
          </p>

          <p style="color: #555555; line-height: 1.6;">
            Best regards,<br>
            <strong>${name}</strong><br>
            ${
              phoneNumber
                ? `<strong>Contact Number: ${phoneNumber}</strong>`
                : ""
            }
          </p>

          <!-- Conditionally render LinkedIn and Portfolio buttons if provided -->
          <div style="display: flex; justify-content: center; margin-top: 20px;">
            ${
              linkedin
                ? `<a href="${linkedin}" style="text-decoration: none; margin-right: 10px;">
                    <button style="background-color: #0077B5; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px;">
                      View My LinkedIn
                    </button>
                  </a>`
                : ""
            }
            ${
              portfolio
                ? `<a href="${portfolio}" style="text-decoration: none;">
                    <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px;">
                      View My Portfolio
                    </button>
                  </a>`
                : ""
            }
          </div>
        </div>
      </div>
    `;

    const info = await sendEmail(email, heading, emailContent);
    return res.status(200).json({ message: "Signup email sent", info });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send signup email" });
  }
};

module.exports = { sendUserEmail_with_Attachment };
