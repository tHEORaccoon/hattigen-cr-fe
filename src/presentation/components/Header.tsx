import { Button } from "./base/Button";

interface HeaderProps {
  title: string;
  description: string;
  clicked: boolean;
  onclick: () => void;
  hideEditButton?: boolean;
}

const Header = ({title, description, clicked, onclick,hideEditButton }: HeaderProps) => {
  const isEdit = clicked;
return (
  <div className="md:flex md:justify-between w-full">
      <div className='flex flex-col justify-center items-start gap-1'>
      <h1 className="text-2xl md:text-4xl font-semibold">{title}</h1>
      <p className="font-[400px] text-sm md:text-base">
          {description}
      </p>
      </div>
      {!hideEditButton && (
        <div className="flex  md:justify-center items-center">
            <Button variant="secondary" onClick={onclick}>{isEdit ? "Done" : "Edit"}</Button>
        </div>
        
      )}
  </div>
)
}

export default Header
