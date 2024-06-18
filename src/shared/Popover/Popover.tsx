import {
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/popover";

const Popover = (props: {
  trigger: JSX.Element;
  extra?: string;
  children: JSX.Element;
}) => {
  const { extra, trigger, children } = props;
  return (
    <ChakraPopover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        className={`w-max rounded-xl bg-white px-4 py-3 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ${extra}`}
      >
        {children}
      </PopoverContent>
    </ChakraPopover>
  );
};

export default Popover;
