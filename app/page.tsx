import LoginForm from '@/components/LoginForm'
import React from 'react'

function Home() {
  return (
    <div className="flex h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <LoginForm/>
    </div>
  )
}

export default Home