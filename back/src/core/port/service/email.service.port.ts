export interface EmailService {
  sendActivationEmail(props: { email: string, name: string, activationToken: string }): Promise<void>
  sendResetUserPasswordEmail(props: { email: string, resetUserPasswordToken: string }): Promise<void>
}
