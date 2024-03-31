/* This example requires Tailwind CSS v2.0+ */
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";
interface selectProps {
  label?: string;
  selected: any;
  setSelected: any;
  data: any;
  name?: string;
  height?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ColouredSelect({
  label,
  selected,
  setSelected,
  data,
  name,
  height,
}: selectProps) {
  // const [selected, setSelected] = useState(people[3])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="flex flex-col w-full">
          <Listbox.Label className="block text-sm font-medium text-neutral-600">
            {label && label}
          </Listbox.Label>
          <div className="mt-1 relative w-full">
            <Listbox.Button
              className={`${
                height ? height : "h-[30px] bg-[#EBF6D4]"
              } relative w-full  border items-center  border-[#cfcfcf] rounded-[5px] shadow-sm pl-3 pr-10  text-left cursor-default focus:outline-none focus:ring-1 focus:ring-[#e5e5e5] focus:border-[#e5e5e5] sm:text-sm `}
            >
              <span className="block truncate capitalize">
                {selected?.value ? selected?.value : name}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <IoIosArrowDown
                  className="h-3 w-3 text-neutral-700"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-high mt-1 w-full  shadow-lg max-h-60 h-20 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto flow-hide focus:outline-none sm:text-sm bg-white ">
                {data?.map((person: any, index: number) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-[#0e0e0e] bg-[#EBF6D4] "
                          : "text-neutral-700 ",
                        "cursor-pointer select-none relative py-2 pl-2 pr-4 "
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected
                              ? "font-semibold text-sm"
                              : "font-normal capitalize text-sm",
                            "block truncate text-sm modal-high"
                          )}
                        >
                          {person?.value}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-neutral-700" : "text-[#0e0e0e]",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5 modal-high"
                            )}
                          >
                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
