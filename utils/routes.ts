export const routes = {
    api: {
        
    },
    pages: {
        login: '/login',
        register: '/create-account',
        home: '/',
        logout: '/logout',
        recoverPassword: '/recover-password',
        resetPassword: '/reset-password',
        dashboard: {
            index: '/dashboard',
            account: {
                index: '/dashboard/account',
                edit: '/dashboard/account/profile',
                payment: '/dashboard/account/payment',
                
            },
            billing: '/dashboard/billing',
            subscriptions: '/dashboard/subscriptions',
            orders: '/dashboard/orders',
        }        
    }
}