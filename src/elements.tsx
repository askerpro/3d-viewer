import styled from 'styled-components';
import { DropzoneArea, DropzoneAreaProps } from 'material-ui-dropzone';
import React from 'react';

export const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

export const DropZoneWrapper = styled.div`
  width: 250px;
  padding: 16px;
  position: absolute;
  right: 0%;
  bottom: 0;
`;

export const StyledDropZoneArea = styled(({ className, ...other }) => (
  <DropzoneArea {...other} dropzoneClass={className} />
))<DropzoneAreaProps>`
  padding: 16px;
` as typeof DropzoneArea;
