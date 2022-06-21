import { HomePage } from './Pages'
import { Route, Switch } from 'react-router-dom'
import { Layout } from './Pages/Layout'
import Header from './Pages/Header'
import ActivePost from './components/Posts/Active'
import ActiveAnnouncement from './components/Announcements/Active'
import HomeAnnouncements from './Pages/Home/HomeAnnouncements'
import Edit from './components/Posts/Edit'
import EditAnnouncement from './components/Announcements/Edit'
import Logout from './components/Logout/Logout'
import { LoginForm } from './Pages/Auth/Login'
import { RegisterForm } from './Pages/Auth/Register'


const App = () => {
	return (
		<div className='App'>	
			<Layout>
				<Header/>
				<Switch>
					<Route path="/posts/:postId/edit" component={Edit} />
					<Route path="/announcements/:announcementId/edit" component={EditAnnouncement} />
					{/* <Route path="/comments/:commentId/edit" component={EditComment} /> */}
					<Route path='/auth/register' component={RegisterForm}/>:
					<Route path='/auth/login' component={LoginForm}/>
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