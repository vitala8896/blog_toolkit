import { HomePage } from './Pages'
import { Route, Switch } from 'react-router-dom'
import { Layout } from './Pages/Layout'
import Header from './Pages/Header'
import ActivePost from './components/Posts/Active'
import ActiveAnnouncement from './components/Announcements/Active'
import HomeAnnouncements from './Pages/Home/HomeAnnouncements'
import Logout from './components/Logout/Logout'
import { ScrollToTop } from './components/UI/Top/Scroll'


const App = () => {
	return (
		<div className='App'>	
			<Layout>
				<ScrollToTop/>
					<Header/>
					<Switch>					
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