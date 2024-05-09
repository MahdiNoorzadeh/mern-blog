import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar"
import DashProfile from "../components/DashProfile"

export default function Dashboard() {
  const loaction = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(loaction.search)
    const tabFormUrl = urlParams.get('tab')
    if (tabFormUrl){
      setTab(tabFormUrl)
    }
  }, [location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* SideBar */}
        <DashSidebar/>
      </div>
      {/* rightSide, like Profile... */}
      {tab === 'profile' && <DashProfile/>}
    </div>
  )
}
