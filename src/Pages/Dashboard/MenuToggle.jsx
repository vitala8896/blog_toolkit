import { Menu } from '../../Assets/Styles/Other/MenuToggle'


const MenuToggle = props => {
  const cls = ['Menu']
  if (props.isOpen) {
    cls.push('open fa fa-times')    
  } else {
    cls.push('fa fa-bars')
  }  
 return <Menu className={cls.join(' ')} onClick={props.onToggle}/>
}
export default MenuToggle