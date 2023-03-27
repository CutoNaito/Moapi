import React from "react";

interface HeadersInputProps {
    headers: { [key: string]: string };
}

export function RequestHeadersInput(props: HeadersInputProps) {
    return (
        <div className="requestHeadersInput">
            <h1 className="requestHeadersInputh1">Request Headers</h1>
            <div className="requestHeadersInputContainer">
                {Object.entries(props.headers).map(([key, value]) => (
                    <div className="requestHeadersInputRow">
                        <input
                            className="requestHeadersInputKey"
                            type="text"
                            value={key}
                            placeholder="Key"
                        />
                        <input
                            className="requestHeadersInputValue"
                            type="text"
                            value={value}
                            placeholder="Value"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}