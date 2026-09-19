export class AuthApi {
  async login() {
    return { status: 'ok' };
  }

  async signup() {
    return { status: 'created' };
  }
}
