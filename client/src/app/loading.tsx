import React from 'react'

type Props = {}

function Loading({}: Props) {
  return (
    <div
        className="w-full h-full flex justify-center items-center"
    >
        <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c3.042 0 5.824-1.135 7.938-3l-2.647-3A7.962 7.962 0 0112 16v4zm5.291-6A7.962 7.962 0 0112 20v4c4.418 0 8-3.582 8-8h-4zm-6.647-3A7.962 7.962 0 0112 4V0c-4.418 0-8 3.582-8 8h4z"
            ></path>
        </svg>
    </div>
  )
}

export default Loading