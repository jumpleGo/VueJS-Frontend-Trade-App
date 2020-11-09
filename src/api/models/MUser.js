export class MUser  {
  constructor (data) {
    if (data) {
      return {
        email: data.email || null,
        balance: data.balance || 0,
        id: data._id || null,
        isVerified: data.isVerified || false,
        isAdmin: data.isAdmin || false,
        name: data.name || 'No Name'
      }
    } else {
      return {
        email: null,
        balance: 0,
        id: null,
        isVerified: false,
        isAdmin: false,
        name: 'No Name'
      }
    }
  }
}