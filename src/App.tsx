import React from 'react';
import ThemeProvider from 'layout/theme';
import Scene from 'components/3dscene';
import { AppWrapper, DropZoneWrapper, StyledDropZoneArea } from './elements';

function App() {
  const [models, setModels] = React.useState<File[]>([]);
  return (
    <ThemeProvider>
      <AppWrapper>
        <DropZoneWrapper>
          <StyledDropZoneArea
            onChange={(files) => {
              files.forEach((file) => {
                if (!models.map((model) => model.name).includes(file.name)) {
                  setModels([...models, file]);
                }
              });
            }}
            filesLimit={10}
            acceptedFiles={['.fbx']}
            dropzoneText="Перетащите сюда .fbx файлы. Названия файлов должны быть уникальными!"
            showPreviewsInDropzone={false}
            maxFileSize={100000000}
          />
        </DropZoneWrapper>

        <Scene items={models} />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
