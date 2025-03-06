import { useState, useEffect } from "react";
import axios from "axios";

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  // Fetch All Jobs

  const fetchJobs = async () => {
    setLoading((prevLoading) => [
      ...prevLoading,
      { id: "fetchJobs", value: true },
    ]);
    try {
      const response = await axios.get("/api/v1/jobs");
      setJobs(response.data.jobs);
    } catch (err) {
      console.error(err);
      setError((prevErrors) => [
        ...prevErrors,
        {
          from: "fetchJobs",
          message: err.response ? err.response.data.message : err.message,
        },
      ]);
    } finally {
      setLoading((prevLoading) =>
        prevLoading.filter((item) => item.id !== "fetchJobs")
      );
    }
  };

  const createJob = async (job) => {
    setLoading((prevLoading) => [
      ...prevLoading,
      { id: "createJob", value: true },
    ]);
    try {
      const response = await axios.post("/api/v1/jobs", job);
      setJobs((jobs) => [...jobs, response.data.jobs]);
      return true;
    } catch (err) {
      console.error(err);
      setError((prevErrors) => [
        ...prevErrors,
        {
          from: "createJob",
          message: err.response ? err.response.data.message : err.message,
        },
      ]);
    } finally {
      setLoading((prevLoading) =>
        prevLoading.filter((item) => item.id !== "createJob")
      );
    }
  };

  const updateJob = async (id, job) => {
    setLoading((prevLoading) => [
      ...prevLoading,
      { id: "updateJob", value: true },
    ]);
    try {
      const response = await axios.put(`/api/v1/jobs/${id}`, job);
      setJobs((prevJobs) =>
        prevJobs.map((item) => (item.id === id ? response.data.job : item))
      );
      return true;
    } catch (err) {
      console.error(err);
      setError((prevErrors) => [
        ...prevErrors,
        {
          from: "updateJob",
          message: err.response ? err.response.data.message : err.message,
        },
      ]);
    } finally {
      setLoading((prevLoading) =>
        prevLoading.filter((item) => item.id !== "updateJob")
      );
    }
  };

  const deleteJob = async (id) => {
    setLoading((prevLoading) => [
      ...prevLoading,
      { id: "deleteJob", value: true },
    ]);
    try {
      await axios.delete(`/api/v1/jobs/${id}`);
      setJobs((jobs) => jobs.filter((job) => job.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      setError((prevErrors) => [
        ...prevErrors,
        {
          from: "deleteJob",
          message: err.response ? err.response.data.message : err.message,
        },
      ]);
    } finally {
      setLoading((prevLoading) =>
        prevLoading.filter((item) => item.id !== "deleteJob")
      );
    }
  };

  const fetchUserPostedJobs = async () => {
    setLoading((prevLoading) => [
      ...prevLoading,
      { id: "fetchUserPostedJobs", value: true },
    ]);
    try {
      const response = await axios.get(`/api/v1/jobs/myjobs`);
      response && setJobs(response.data.jobs);
    } catch (err) {
      console.error(err);
      setError((prevErrors) => [
        ...prevErrors,
        {
          from: "fetchUserPostedJobs",
          message: err.response ? err.response.data.message : err.message,
        },
      ]);
    } finally {
      setLoading((prevLoading) =>
        prevLoading.filter((item) => item.id !== "fetchUserPostedJobs")
      );
    }
  };

  const getJobById = async (id) => {
    setLoading((prevLoading) => [
      ...prevLoading,
      { id: "getJobById", value: true },
    ]);
    try {
      const response = await axios.get(`/api/v1/jobs/${id}`);
      console.table(response.data.job);
      return response.data.job;
    } catch (err) {
      console.error(err);
      setError((prevErrors) => [
        ...prevErrors,
        {
          from: "getJobById",
          message: err.response ? err.response.data.message : err.message,
        },
      ]);
    } finally {
      setLoading((prevLoading) =>
        prevLoading.filter((item) => item.id !== "getJobById")
      );
    }
  };

  const getJobsAppliedByUser = async (userId) => {
    setLoading((prevLoading) => [
      ...prevLoading,
      { id: "getJobsAppliedByUser", value: true },
    ]);
    try {
      const response = await axios.get(`/api/v1/jobs/${userId}/applied`);
      return response.data;
    } catch (err) {
      console.error(err);
      setError((prevErrors) => [
        ...prevErrors,
        {
          from: "getJobsAppliedByUser",
          message: err.response ? err.response.data.message : err.message,
        },
      ]);
    } finally {
      setLoading((prevLoading) =>
        prevLoading.filter((item) => item.id !== "getJobsAppliedByUser")
      );
    }
  };

  const getSuggestedJobs = async (userId) => {
    setLoading((prevLoading) => [
      ...prevLoading,
      { id: "getSuggestedJobs", value: true },
    ]);
    try {
      const response = await axios.get(`/api/v1/jobs/${userId}/suggested`);
      return response.data;
    } catch (err) {
      console.error(err);
      setError((prevErrors) => [
        ...prevErrors,
        {
          from: "getSuggestedJobs",
          message: err.response ? err.response.data.message : err.message,
        },
      ]);
    } finally {
      setLoading((prevLoading) =>
        prevLoading.filter((item) => item.id !== "getSuggestedJobs")
      );
    }
  };

  return {
    jobs,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
    getJobsAppliedByUser,
    getSuggestedJobs,
    fetchUserPostedJobs,
    fetchJobs,
  };
};

export default useJobs;
