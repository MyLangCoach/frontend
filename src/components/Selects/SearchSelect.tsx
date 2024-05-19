import { useState } from "react";

import { Combobox } from "@headlessui/react";

interface SelectedProps {
  options: any;
  selectedPerson: any;
  setSelectedPerson: any;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({
  options,
  setSelectedPerson,
  selectedPerson,
}: SelectedProps) {
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? options
      : options.filter((person: any) => {
          return person?.firstname.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm capitalize"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person: any) =>
            `${person?.firstname || ""}  ${person?.lastname || ""}`
          }
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        {/* icon here */}
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person: any) => (
              <Combobox.Option
                key={person._id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <img
                        src={person.image}
                        alt=""
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={classNames(
                          "ml-3 truncate capitalize",
                          selected && "font-semibold"
                        )}
                      >
                        {person?.firstname +
                          " " +
                          `${
                            person?.lastname !== null || undefined
                              ? person?.lastname
                              : ""
                          }`}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                     
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
