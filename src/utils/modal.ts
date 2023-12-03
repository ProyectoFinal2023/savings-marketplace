import { ConfirmDialogOptions, confirmDialog } from "primereact/confirmdialog";
import { DialogProps } from "primereact/dialog";

type ConfirmOptions = {
  message: React.ReactNode | ((options: ConfirmDialogOptions) => React.ReactNode),
  header: React.ReactNode | ((props: DialogProps) => React.ReactNode),
  accept?: () => void,
  reject?: () => void,
}

export const confirmAction = ({ message, header, accept, reject }: ConfirmOptions) => {
  confirmDialog({
    message,
    header,
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí',
    accept,
    reject,
  });
}
