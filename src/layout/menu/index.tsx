import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import React from 'react';
import {} from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import { MyDrawer } from './elements';

interface Props {
  items: File[];
  onChange: (files: File[]) => void;
}

const MyDrawerComponent: React.FC<Props> = ({ items, onChange }) => {
  return (
    <MyDrawer variant="permanent" anchor="left">
      <List>
        {items.map((item) => {
          return (
            <ListItem button key={item.name}>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <DropzoneArea
        onChange={onChange}
        filesLimit={10}
        acceptedFiles={['.fbx']}
        dropzoneText="Перетащите сюда .fbx файлы. Названия файлов должны быть уникальными!"
        showPreviewsInDropzone
        maxFileSize={100000000}
      />
    </MyDrawer>
  );
};

export default MyDrawerComponent;
