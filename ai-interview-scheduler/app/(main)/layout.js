// dedicated layout for DASHBOARD

import React from 'react'
import DashboardProvider from './provider'
import Provider from '@/app/provider'

function DashboardLayout({children}) {
  return (
   <Provider>                          
      <DashboardProvider>
        <div className="p-10">
          {children}
        </div>
      </DashboardProvider>
    </Provider>
  )
}

export default DashboardLayout