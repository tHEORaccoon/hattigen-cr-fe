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

            <button className="bg-black text-white w-20 h-8 mt-5 md:mt-0 md:w-[120px] md:h-[50px] rounded-full font-semibold" type="button" onClick={onclick}>{isEdit ? "Done" : "Edit"}</button>
        </div>
        
      )}
  </div>
)
}

export default Header
