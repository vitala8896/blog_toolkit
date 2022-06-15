import { useSelector } from 'react-redux'
import { LoginPage, HomePage } from './Pages'
import { Route, Switch } from 'react-router-dom'
import { Layout } from './Pages/Layout'
import Header from './Pages/Header'
import ActivePost from './components/Posts/Active'
import ActiveAnnouncement from './components/Announcements/Active'
import HomeAnnouncements from './Pages/Home/HomeAnnouncements'
import PostCreator from './components/Posts/Creator'
import AnnouncementCreator from './components/Announcements/Creator'
import Edit from './components/Posts/Edit'
import EditAnnouncement from './components/Announcements/Edit'
import Logout from './components/Logout/Logout'

const App = () => {
	const { isAuthenticated } = useSelector(state => ({
		isAuthenticated: state.auth.isAuthenticated
	}))
	return (
		<div className='App'>	
			<Layout>
				<Header/>
				<Switch>
				<Route path="/post-creator" component={PostCreator} />
				<Route path="/announcement-creator" component={AnnouncementCreator} />
				<Route path="/posts/:postId/edit" component={Edit} />
        <Route path="/announcements/:announcementId/edit" component={EditAnnouncement} />
				<Route path='/auth/register' component={LoginPage}/>:
				<Route path='/auth/login' component={LoginPage}/>
				<Route path="/posts/:postId" component={ActivePost} />
				<Route path="/announcements/:announcementId" component={ActiveAnnouncement} />
        <Route path="/announcements" component={HomeAnnouncements} />
				<Route path="/logout" component={Logout} />
				<Route path='/' exact component={HomePage} />				
			</Switch>
			</Layout>			
		</div>
	)
}

export default App