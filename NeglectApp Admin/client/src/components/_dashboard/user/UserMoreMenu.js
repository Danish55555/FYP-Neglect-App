import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import {fetchDoctors, dispatchGetDoctors} from '../../../redux/actions/doctorsAction';
import {fetchGuardians, dispatchGetGuardians} from '../../../redux/actions/guardiansAction';
import { useDispatch, useSelector } from 'react-redux'

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from 'axios'

// ----------------------------------------------------------------------



export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector(state=> state.token)
  const dispatch = useDispatch()

  const deleteuser = async(id) =>{
    try{
      if(props.userole === 2){
        await axios.delete(`/admin/deletedoctor/${id}`, {
          headers: {Authorization: token}
      }).then( 
        fetchDoctors(token).then(res=> {
        dispatch(dispatchGetDoctors(res))
      }))
      }
      else{
        await axios.delete(`/admin/deleteguardian/${id}`, {
          headers: {Authorization: token}
      }).then( 
        fetchGuardians(token).then(res=> {
        dispatch(dispatchGetGuardians(res))
      }))
      }
      
    }catch(err){
      console.log(err)
  
    }
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} onClick={()=> deleteuser(props.id)} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Profile" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
