import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { privateApi } from "../services/api";

export default () => {
  const { id: taskId } = useParams();
  const {
    data: task,
    isLoading,
    isError,
    refetch,
  } = useQuery(["fetchTask", taskId], async () => {
    const res = await privateApi.get(`/api/v1/tasks/${taskId}`);

    return res.data.result?.task;
  });

  return { isError, isLoading, task, refetch };
};
