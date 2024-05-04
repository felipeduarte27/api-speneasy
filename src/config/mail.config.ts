import { MailerModule } from '@nestjs-modules/mailer';

export const mailConfig = MailerModule.forRoot({
  transport: {
    host: 'smtp.mailgun.org', //host smtp
    secure: false, //regras de segurança do serviço smtp
    port: 587, // porta
    auth: {
      //dados do usuário e senha
      user: '',
      pass: '',
    },
    ignoreTLS: true,
  },
  defaults: {
    // configurações que podem ser padrões
    from: '"',
  },
});
