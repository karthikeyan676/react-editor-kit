import React, { FunctionComponent, ReactNode, Fragment, useState } from "react";
import { useEditorKit } from "../../editor/EditorKit";
import { blockEvent } from "../../ui/Utils";
import { ImageExtensions } from "./ImageExtensions";
import { isImageUrl } from "./ImagePlugin";
import { HtmlElementModalPopup } from "../popup/HtmlElementModalPopup";
import { LabelsPlugin } from "../i18n/LabelsPlugin";
import { SaveDialog } from "../../ui/SaveDialog";
import { usePlugin } from "../../plugins/usePlugin";
import { Transforms } from "slate";
import { useLastFocused } from "../../editor/LastFocusedNode";

export interface InsertImageByUrlActionProps {
  children: ReactNode;
  extensions?: string[];
}

export const InsertImageByUrlAction: FunctionComponent<InsertImageByUrlActionProps> = (
  props: InsertImageByUrlActionProps
) => {
  const { children } = props;
  const { editor, executeAction } = useEditorKit();
  const { labels } = usePlugin<LabelsPlugin>("label-provider");
  const [show, setShow] = useState(false);
  const { point } = useLastFocused(editor);

  const handleSave = (url: string): void => {
    if (isImageUrl(url)) {
      if (point) {
        Transforms.select(editor, point);
      }
      executeAction("image", { url });
    }
    toggleShow();
  };

  const toggleShow = () => {
    setShow((show) => !show);
  };

  const onMouseDown = (event?: React.MouseEvent) => {
    blockEvent(event as React.MouseEvent);
    toggleShow();
  };
  return (
    <Fragment>
      <div onMouseDown={onMouseDown}>{children}</div>
      <HtmlElementModalPopup
        show={show}
        element={document.body}
        onClickOutside={toggleShow}
        location={"center"}
      >
        <SaveDialog
          className={"rek-image-url-dialog"}
          saveButtonText={labels.save}
          placeholderText={labels.validImageUrl}
          onSave={handleSave}
        />
      </HtmlElementModalPopup>
    </Fragment>
  );
};

InsertImageByUrlAction.defaultProps = {
  extensions: ImageExtensions,
};
