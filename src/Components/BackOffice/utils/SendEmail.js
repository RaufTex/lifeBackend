import axios from "axios";

const obj = {
  subject: "SendGrid Template Demo",
  heading: "Teste",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  image:
    "https://images.unsplash.com/photo-1583552188819-4cab7da34a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
};

let htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <body>
        <h1>${obj.heading}</h1>
        <a href="default.asp">
        <img src=${obj.image} alt="HTML tutorial" style="width:200px;height:200px;border:0">
        </a>
        <p>${obj.description}</p>
        </body>
        </html>
`;

const callMethod = (email) => {
  axios({
    method: "get",
    url: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      Authorization:
        "Bearer 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"
    },
    data: {
      personalizations: [
        {
          to: [
            {
              email: email,
            }
          ],
          subject: `${obj.subject}`
        }
      ],
      from: {
        email: "rtteixeira30@gmail.com"
      },
      content: [{ type: "text/html", value: htmlTemplate }]
    }
  });
};

callMethod();