import { StorageAdapter, AuthProviderConfig, User } from '@polvo-labs/react-auth'

export default class LocalStorageAdapter implements StorageAdapter {
  async hasUser (config: AuthProviderConfig): Promise<boolean> {
    const user = localStorage.getItem(`${config.namespace}.user`)
    return !!user
  }

  async getUser (config: AuthProviderConfig): Promise<User> {
    const result = localStorage.getItem(`${config.namespace}.user`)

    if (!result) {
      throw new Error('User not found')
    }

    const user = JSON.parse(result)

    return Promise.resolve({
      email: user.email,
      token: user.token,
    })
  }

  async setUser (user: User, config: AuthProviderConfig): Promise<void> {
    localStorage.setItem(
      `${config.namespace}.user`,
      JSON.stringify(user),
    )
  }

  async clearUser (config: AuthProviderConfig): Promise<void> {
    localStorage.removeItem(`${config.namespace}.user`)
  }
}
