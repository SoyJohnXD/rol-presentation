import { RiCheckFill, RiErrorWarningFill } from "@remixicon/react";
import { Dialog, DialogPanel, Icon } from "@tremor/react";
import Button from "../button";

interface IDialog {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  aditionalText?: string;
}

export const ModalType: React.FC<IDialog> = ({
  isOpen,
  onClose,
  type,
  aditionalText,
}) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} static={true}>
        <DialogPanel className="flex flex-col items-center">
          <div className="flex flex-col justify-center items-center">
            {type === "error" ? (
              <Icon size="xl" icon={RiErrorWarningFill} color="red" />
            ) : (
              <Icon size="xl" icon={RiCheckFill} color="green" />
            )}

            <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {type === "error"
                ? "¡Ha ocurrido un error!"
                : "¡Informacion Guardada con exito!"}
            </h3>
          </div>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {type === "error"
              ? "Error al intentar guardar la informacion."
              : "Tu informaciion ha sido guardada exitosamente."}
          </p>
          <p className="mt-2 leading-6 text-center text-sm w-10/12 text-gray-400 dark:text-dark-tremor-content">
            {aditionalText}
          </p>
          <Button
            type="button"
            text="Aceptar"
            classButton="mt-8 w-fit px-4"
            onClick={() => onClose()}
          />
        </DialogPanel>
      </Dialog>
    </>
  );
};

interface IDialogCustom {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalCustom: React.FC<IDialogCustom> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} static={true}>
        <DialogPanel className="flex flex-col items-center">
          {children}
        </DialogPanel>
      </Dialog>
    </>
  );
};
