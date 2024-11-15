import  React from 'react';
import { TaskRow as OriginalTaskRow } from './ui';

const TaskRow = React.memo(OriginalTaskRow);

export { TaskRow };