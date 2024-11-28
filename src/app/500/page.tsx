"use client"
import Error from "next/error";

export default function five00() {
    return (<Error statusCode={500}></Error>)
}