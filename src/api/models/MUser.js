export class MUser  {
  constructor (data) {
    if (data) {
      return {
        email: data.email || null,
        balance: data.balance || 0,
        id: data._id || null,
        isVerified: data.isVerified || false,
        isAdmin: data.isAdmin || false,
        isBlocked: data.isBlocked || false,
        name: data.name || 'No Name',
        created_at: data.created_at,
        withdrawalBlocked: data.withdrawalBlocked || false
      }
    } else {
      return {
        email: null,
        balance: 0,
        id: null,
        isVerified: false,
        isAdmin: false,
        isBlocked: false,
        name: 'No Name',
        withdrawalBlocked: false
      }
    }
  }
}