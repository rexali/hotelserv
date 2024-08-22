export const permissions = {
   user: {
      read: true,
      write: true,
      delete: false,

   },
   admin: {
      read: true,
      write: true,
      delete: true,
   },
   guest: {
      read: true,
      write: false,
      delete: false,
   }
}