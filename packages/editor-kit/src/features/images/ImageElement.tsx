import React from "react";
import { Transforms } from "slate";
import {
  RenderElementProps,
  useSelected,
  useFocused,
  ReactEditor,
} from "slate-react";
import { DeletableElement } from "../elements/DeletableElement";
import { useEditorKit } from "../../editor/EditorKit";

export interface ImageElementProps extends RenderElementProps {}

export const ImageElement = (props: RenderElementProps) => {
  const { children, element, attributes, ...rest } = props;
  const { editor } = useEditorKit();
  const handleClick = () => {
    Transforms.select(editor, ReactEditor.findPath(editor, element));
  };
  const selected = useSelected();
  const focused = useFocused();
  const focusedClass = selected && focused ? "rek-focused" : "";

  return (
    <DeletableElement {...props}>
      <div contentEditable={false} onClick={handleClick} {...rest}>
        <img
          {...attributes}
          src={element.url}
          className={`rek-image ${focusedClass}`}
        />
      </div>
      {children}
    </DeletableElement>
  );
};
