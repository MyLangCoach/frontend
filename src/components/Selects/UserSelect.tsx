/* This example requires Tailwind CSS v2.0+ */
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";
interface selectProps {
  label: string;
  selected: any;
  setSelected: any;
  data: any;
  name?: string;
  height?: string;
  bgColor?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function UserSelect({
  label,
  selected,
  setSelected,
  data,
  name,
  height,
  bgColor,
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
                height ? height : "h-[50px]  bg-white"
              } relative w-full  rounded-[12px] shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none  focus:border-none sm:text-sm`}
            >
              <span className="block truncate capitalize">
                {selected?.name ? selected?.name : name}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <IoIosArrowDown
                  className="h-5 w-5 text-black"
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
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {data?.map((person: any, index: number) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-[#0e0e0e] bg-[#EBF6D4]"
                          : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-8 pr-4"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected
                              ? "font-semibold"
                              : "font-normal capitalize",
                            "block truncate"
                          )}
                        >
                          {person?.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-[#0e0e0e]",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
