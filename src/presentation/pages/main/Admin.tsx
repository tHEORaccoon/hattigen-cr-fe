import React, { useRef, useState, useEffect } from "react";
import { SlidersHorizontal, Search, ChevronDown, X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "../../../components/ui/sheet";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import DownloadDropdown from "../../components/DownloadDropdown";
import ShareCV from "../../components/ShareCV";
import { RootState } from "@/core/redux/store/store";
import { useSelector } from "react-redux";
import { adminProfile, CheckCircleSuccess, img1, img2, LogoImage } from "@/assets";

const developers = [
  {
    name: "Ingrid Blue Appiah",
    role: "Frontend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "UI designer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img2,
    skills: ["photoshop", "Illustrator", "UI/UX"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "DevOps Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img2,
    skills: ["Docker", "Kubernettes", "Cloud Computing"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "DevOps Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img2,
    skills: ["Docker", "Kubernettes", "Cloud Computing"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "DevOps Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img2,
    skills: ["Docker", "Kubernettes", "Cloud Computing"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "DevOps Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img2,
    skills: ["Docker", "Kubernettes", "Cloud Computing"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "UI designer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img2,
    skills: ["photoshop", "Illustrator", "UI/UX"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "UI designer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img2,
    skills: ["photoshop", "Illustrator", "UI/UX"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Ingrid Blue Appiah",
    role: "Backend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Node.js", "MongoDB", "Express"],
  },
  {
    name: "Berlinda Appiah",
    role: "Frontend Engineer",
    email: "ingrid.appiah@coderaccoon.com",
    image: img1,
    skills: ["Nextjs", "Vue", "Angular"],
  },
];

export interface Developer {
  name: string;
  role: string;
  email: string;
  image: string;
}

const DeveloperCard: React.FC<{ developer: Developer }> = ({ developer }) => {
  return (
    <Link to={`/profile-page`}>
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <img
          src={developer.image}
          alt={developer.name}
          className="w-32 h-32 rounded-full mx-auto object-cover"
        />
        <h3 className="mt-4 font-semibold text-lg">{developer.name}</h3>
        <p className="text-green-600">{developer.role}</p>
        <p className="text-gray-500 text-sm">{developer.email}</p>
      </div>
    </Link>
  );
};

const DeveloperDirectory = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredDevelopers, setFilteredDevelopers] = useState<Developer[]>([]);
  const [visibleDevelopers, setVisibleDevelopers] = useState<Developer[]>([]);
  const ITEMS_PER_PAGE = 6;
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(
    {}
  );
  const [selectedInput, setSelectedInput] = useState<Record<string, string>>(
    {}
  );
  const [selectedMonth, setSelectedMonth] = useState<Record<string, string>>(
    {}
  );

  const [isListView, setIsListView] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  //dropdown menu toogle function
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || !(event.target instanceof HTMLElement)) return;
      if (!event.target.closest(".profile-menu")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setVisibleDevelopers(developers.slice(0, ITEMS_PER_PAGE));
  }, []);

  // Infinite Scroll with Intersection Observer
  useEffect(() => {
    if (!lastElementRef.current) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        visibleDevelopers.length < filteredDevelopers.length
      ) {
        loadMoreDevelopers();
      }
    });
    observer.current.observe(lastElementRef.current);
    return () => observer.current?.disconnect();
  }, [visibleDevelopers, filteredDevelopers]);

  const loadMoreDevelopers = () => {
    setVisibleDevelopers((prevState) => [
      ...prevState,
      ...filteredDevelopers.slice(
        prevState.length,
        prevState.length + ITEMS_PER_PAGE
      ),
    ]);
  };

  useEffect(() => {
    const filtered = developers.filter(
      (dev) =>
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDevelopers(filtered);
    setVisibleDevelopers(filtered.slice(0, ITEMS_PER_PAGE));
    setIsListView(searchTerm.length > 0);
  }, [searchTerm]);

  const addItem = (category: string, item: string) => {
    if (!item.trim()) return;
    setSelectedItems((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), item],
    }));
  };

  const removeItem = (category: string, item: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((i) => i !== item),
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <img
            src={LogoImage}
            alt="Code Raccoon Logo"
            className="w-10 sm:w-12 md:w-24"
          />

          {/* Search Bar */}
          <div className="relative w-full sm:w-80 md:w-96 lg:w-[28rem]">
            <input
              type="text"
              placeholder="Find a developer..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-4 flex-wrap">

          <DownloadDropdown  user={user}/>
          <ShareCV />
        </div>
        <div className="relative profile-menu mt-4 md:mt-0">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={adminProfile}
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-md"
            />
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border">
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Add admin
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>
      {/* Filter Button */}
      <div
        className={`flex ${
          isListView ? "justify-between" : "justify-end"
        } px-4 md:px-10 py-4`}
      >
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(selectedItems).flatMap(([category, items]) =>
            items.map((item) => (
              <span
                key={`${category}-${item}`}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center"
              >
                {item}
                <X
                  className="ml-1 w-3 h-3 cursor-pointer"
                  onClick={() => removeItem(category, item)}
                />
              </span>
            ))
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-[#1866FD] flex items-center ">
              <SlidersHorizontal className="w-5 h-5 mr-1 text-[#1866FD]" />{" "}
              Filters
            </button>
          </SheetTrigger>
          {/* Filter Modal */}
          <SheetContent
            side="right"
            className="w-[350px] sm:w-[400px] bg-white p-4 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b mb-4 py-5">
              <button className="text-[#1866FD] flex items-center text-lg font-semibold">
                <SlidersHorizontal className="w-5 h-5 mr-2" /> Filters
              </button>
              <SheetClose asChild>
                <button className="text-red-500 text-lg font-semibold">
                  Close
                </button>
              </SheetClose>
            </div>

            {/* Filter Categories */}
            <div className="mt-4 space-y-2 ">
              {[
                "Programming Languages",
                "Databases & ORM",
                "AI Experience",
                "Cloud Platforms",
                "Mobile Environments",
                "Skillsets",
                "CMS",
                "E-Learning Tools",
                "Spoken Languages",
                "Tools",
                "Office Tools",
                "Project Management Tools",
                "Business Intelligence",
              ].map((category) => (
                <div key={category} className="border-b py-2 pb-5 relative">
                  <button
                    className="w-full flex justify-between items-center text-black font-semibold relative px-4 py-3"
                    onClick={() => toggleSection(category)}
                  >
                    <div className="flex items-center space-x-2">
                      {category}
                      {selectedItems[category]?.length > 0 && (
                        <span className="w-2 h-2 bg-green-500 rounded-full absolute top-3 left-52"></span>
                      )}
                    </div>
                    <ChevronDown
                      className={`transition-transform ${
                        openSections[category] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSections[category] && (
                    <div className="mt-2">
                      {/* Input Section */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Find ${category}...`}
                          className="flex-1 border rounded px-3 py-2"
                          value={selectedInput[category] || ""}
                          onChange={(e) =>
                            setSelectedInput((prev) => ({
                              ...prev,
                              [category]: e.target.value,
                            }))
                          }
                        />
                        <input
                          type="number"
                          placeholder="0"
                          className="w-12 border rounded px-3 py-2"
                          value={selectedMonth[category] || ""}
                          onChange={(e) =>
                            setSelectedMonth((prev) => ({
                              ...prev,
                              [category]: e.target.value,
                            }))
                          }
                        />
                        {/* Add Button */}
                        <button
                          onClick={() => {
                            if (
                              selectedInput[category] &&
                              selectedMonth[category]
                            ) {
                              addItem(
                                category,
                                `${selectedInput[category]} (${selectedMonth[category]} months)`
                              );
                              setSelectedInput((prev) => ({
                                ...prev,
                                [category]: "",
                              }));
                              setSelectedMonth((prev) => ({
                                ...prev,
                                [category]: "",
                              }));
                            }
                          }}
                        >
                          <img
                            src={CheckCircleSuccess}
                            alt="Checkmark"
                            className="w-7 h-7 cursor-pointer"
                          />
                        </button>
                      </div>
                      {/* Selected Items */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedItems[category]?.map((item) => (
                          <span
                            key={item}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center"
                          >
                            {item}
                            <X
                              className="ml-1 w-3 h-3 cursor-pointer"
                              onClick={() => removeItem(category, item)}
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                className="text-red-500"
                onClick={() => {
                  setSelectedItems({});
                  setFilteredDevelopers(developers);
                  setVisibleDevelopers(developers.slice(0, ITEMS_PER_PAGE));
                  setIsListView(false); // Reset back to Grid View
                }}
              >
                Clear All
              </button>
              <Button
                className="bg-[#1866FD] text-white font-semibold text-lg rounded-full px-6 py-2"
                //  onClick={() => {
                //   const filtered = developers.filter((dev) => {
                //     return Object.entries(selectedItems).every(([category, items]) => {
                //       return items.some((item) => {
                //         if (category === "Skillsets") {
                //           // Ensure comparison is case-insensitive and properly checks for inclusion
                //           return dev.skills.some((skill) =>
                //             skill.toLowerCase().includes(item.toLowerCase().split(" ")[0]) // Extract skill name before months
                //           );
                //         }
                //         return true; // Keep other categories unaffected
                //       });
                //     });
                //   });

                //   setFilteredDevelopers(filtered);
                //   setVisibleDevelopers(filtered.slice(0, ITEMS_PER_PAGE));
                //   setIsListView(true);
                // }}
                onClick={() => {
                  const filtered = developers.filter((dev) => {
                    return Object.entries(selectedItems).every(
                      ([category, items]) => {
                        return items.some((item) => {
                          if (category === "Skillsets") {
                            return dev.skills.some((skill) =>
                              skill
                                .toLowerCase()
                                .includes(item.toLowerCase().split(" ")[0])
                            );
                          }
                          return dev.role
                            .toLowerCase()
                            .includes(item.toLowerCase());
                        });
                      }
                    );
                  });

                  setFilteredDevelopers(filtered);
                  setVisibleDevelopers(filtered.slice(0, ITEMS_PER_PAGE));
                  setIsListView(true);
                }}
              >
                Apply
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Result Count */}
      {isListView && (
        <div className="ml-10 mb-5 text-gray-600 text-sm mt-2">
          {filteredDevelopers.length} developers found
        </div>
      )}

      <div
        className={`px-4 md:px-10 ${
          isListView
            ? "flex flex-col gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        }`}
      >
        {visibleDevelopers.length === 0 ? (
          <div className="text-center text-gray-500 col-span-full">
            No developers found matching your filters.
          </div>
        ) : (
          visibleDevelopers.map((dev, index) => (
            <div
              key={index}
              ref={
                index === visibleDevelopers.length - 1 ? lastElementRef : null
              }
            >
              {isListView ? (
                // List View
                <div className="flex items-center bg-white shadow-md rounded-lg p-4">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{dev.name}</h3>
                    <p className="text-green-600">{dev.role}</p>
                    <p className="text-gray-500 text-sm">{dev.email}</p>
                  </div>
                </div>
              ) : (
                <DeveloperCard developer={dev} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeveloperDirectory;
