"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import "./consulttantShow.css";

export default function MyconclusionForm() {
  const [mycounsel, setMyCounsel] = useState([]);
  const [filteredCounsel, setFilteredCounsel] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([
    { name: "Client Name (English)", value: "clientNameEnglish" },
    { name: "Email Address", value: "emailAddress" },
    { name: "Consulting Type", value: "consultingType" },
    { name: "Consulting Method", value: "consultingMethod" },
    { name: "Counsel", value: "counsel" },
  ]); // Default columns to show

  // State for filters
  const [counselingType, setCounselingType] = useState("all");
  const [counselingMethod, setCounselingMethod] = useState("all");
  const [counsel, setCounsel] = useState("all");
  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [showColumnList, setShowColumnList] = useState(false); // Toggle column list visibility
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    axios.get("api/counsellingApi").then(function (resp) {
      let counsel = resp.data.counsel;
      setMyCounsel(counsel);
      setFilteredCounsel(counsel); // Initially show all data
    });
  }, []);

  const router = useRouter();

  // Handle sorting/filtering
  const handleSort = () => {
    let filteredData = mycounsel;

    if (counselingType !== "all") {
      filteredData = filteredData.filter(
        (data) => data.consultingType === counselingType
      );
    }

    if (counselingMethod !== "all") {
      filteredData = filteredData.filter(
        (data) => data.consultingMethod === counselingMethod
      );
    }

    if (counsel !== "all") {
      filteredData = filteredData.filter((data) => data.counsel === counsel);
    }

    // Apply month and year filters
    if (month !== "all") {
      filteredData = filteredData.filter(
        (data) =>
          new Date(data.consultationDate).getMonth() === parseInt(month) - 1
      );
    }

    if (year !== "all") {
      filteredData = filteredData.filter(
        (data) => new Date(data.consultationDate).getFullYear() === parseInt(year)
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filteredData = filteredData.filter(
        (data) =>
          data.clientNameAerobic
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (data.clientNameEnglish &&
            data.clientNameEnglish
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredCounsel(filteredData);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSort(); // Re-apply sorting/filtering on search query change
  };

  const handleCheckboxChange = (e, column) => {
    if (e.target.checked) {
      setSelectedColumns((prevSelected) => [...prevSelected, column]);
    } else {
      setSelectedColumns((prevSelected) =>
        prevSelected.filter((col) => col.value !== column.value)
      );
    }
  };

  let fields = [
    { name: "Client Select", value: "clientSelect" },
    { name: "Client Name (A)", value: "clientNameAerobic" },
    { name: "Client Name (E)", value: "clientNameEnglish" },
    { name: "Email Address", value: "emailAddress" },
    { name: "Legal Form", value: "legalForm" },
    { name: "Address", value: "address" },
    { name: "Consultation Title", value: "consultationTitle" },
    { name: "Consulting Type", value: "consultingType" },
    { name: "Consulting Period", value: "consultingPeriod" },
    { name: "Case Facts", value: "caseFacts" },
    { name: "The Counselling", value: "theCounselingFact" },
    { name: "File Attachement", value: "theFileAttachment" },
    {
      name: "Consultation Date", value: "consultationDate", func: (value) => {
        return new Date(value).toDateString()
      }
    },
    { name: "Consulting Method", value: "consultingMethod" },
    { name: "Counsel", value: "counsel" },
    { name: "Consultation Time", value: "consultationTime" },
    { name: "Phone Number", value: "phoneNumber" },
  ]

  // Month and Year lists
  const monthList = [
    { value: "1", name: "January" },
    { value: "2", name: "February" },
    { value: "3", name: "March" },
    { value: "4", name: "April" },
    { value: "5", name: "May" },
    { value: "6", name: "June" },
    { value: "7", name: "July" },
    { value: "8", name: "August" },
    { value: "9", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" },
  ];

  const yearList = Array.from({ length: 2024 - 2009 + 1 }, (_, i) => (2009 + i).toString());



  const itemsPerPage =20;

   
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredCounsel.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCounsel.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="maindiv">
      <div className="p-0.5 rounded boxes">
        <div className="row mb-3 mt-2">
          <div className="d-flex col-md-9">
            <h5 className="me-2 mt-2">Advanced search</h5>
            <div className="input-group w-50">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search by the client's name or the title of the consultation"
                value={searchQuery}
                onChange={handleSearchChange} // Handle search input change
              />
            </div>
            <button className="btn btn-primary" onClick={handleSort}>
              Search
            </button>
          </div>

          <div className="col-md-3 text-end">
            <button
              className="btn"
              onClick={() => {
                router.push("./addConselling");
              }}
            >
              New Consultation
            </button>
          </div>
        </div>
      </div>

      <div className="p-1 rounded mt-2 boxes">
        <div className="row">
          <div className="col-md-2">
            <label className="form-label">
              <b>Counselling Type</b>
            </label>
            <select
              className="form-select"
              value={counselingType}
              onChange={(e) => setCounselingType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">
              <b>Counselling Method</b>
            </label>
            <select
              className="form-select"
              value={counselingMethod}
              onChange={(e) => setCounselingMethod(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Method 1">Method 1</option>
              <option value="Method 2">Method 2</option>
              <option value="Method 3">Method 3</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">
              <b>Counsel</b>
            </label>
            <select
              className="form-select"
              value={counsel}
              onChange={(e) => setCounsel(e.target.value)}
            >
              <option value="all">All</option>
              <option value="ali">Ali</option>
              <option value="karim">Karim</option>
              <option value="altaf">Altaf</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">
              <b>Consultation Date</b>
            </label>
            <div className="input-group">
              <select
                className="form-select me-1"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="all">All Months</option>
                {monthList.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="all">All Years</option>
                {yearList.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div><button className="btn btn-primary" onClick={handleSort}>Sort</button></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-1 rounded mt-2 boxes">


        <div className="dropdown mb-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Columns
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {fields.map((column) => (
              <li key={column.value}>
                <label className="dropdown-item">
                  <input
                    type="checkbox"
                    value={column.value}
                    checked={selectedColumns.some(
                      (col) => col.value === column.value
                    )}
                    onChange={(e) => handleCheckboxChange(e, column)}
                  />{" "}
                  {column.name}
                </label>
              </li>
            ))}
          </ul>
        </div>


        <table className="table table-bordered">
          <thead>
            <tr>
              {selectedColumns.map((col, index) => (
                <th key={index}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => {

              
              return <tr key={index}>
                {selectedColumns.map((col, colIndex) => {

                let field=  fields.find((field)=>{return field.value ==  col.value});
                  
                  return <td key={colIndex}>
                    { field.func ? field.func(data[col.value]) : data[col.value]}

                    </td>
                })}
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <div className='d-flex jsutify-content-center' >
        <nav aria-label="Page navigation example d-flex jsutify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <li key={pageIndex} className={`page-item ${currentPage === pageIndex + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageClick(pageIndex + 1)}>
                  {pageIndex + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
