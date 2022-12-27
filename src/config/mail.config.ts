import { MailerModule } from '@nestjs-modules/mailer';

export const mailConfig = MailerModule.forRoot({
  transport: {
    host: 'smtp.mailgun.org', //host smtp
    secure: false, //regras de segurança do serviço smtp
    port: 587, // porta
    auth: {
      //dados do usuário e senha
      user: 'postmaster@sandbox369169e470054998b86ca7736c807444.mailgun.org',
      pass: 'ef7d5dd3a000482d90bb60c3f0117a8a-c2efc90c-fe535335',
    },
    ignoreTLS: true,
  },
  defaults: {
    // configurações que podem ser padrões
    from: '"',
  },
});
