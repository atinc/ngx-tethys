import { XhrFactory } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

export class MockXhrFactory {
    mock = new MockXMLHttpRequest();
}

export class MockXMLHttpRequest {
    // Set by method calls.
    body: any;
    // TODO(issue/24571): remove '!'.
    method!: string;
    // TODO(issue/24571): remove '!'.
    url!: string;
    mockHeaders: { [key: string]: string } = {};
    mockAborted: boolean = false;

    // Directly settable interface.
    withCredentials: boolean = false;
    responseType: string = 'text';

    // Mocked response interface.
    response: any | undefined = undefined;
    responseText: string | undefined = undefined;
    responseURL: string | null = null;
    status: number = 0;
    statusText: string = '';
    mockResponseHeaders: string = '';
    readyState: number;

    listeners: {
        error?: (event: ErrorEvent) => void;
        load?: () => void;
    } = {};

    open(method: string, url: string): void {
        this.method = method;
        this.url = url;
    }

    send(body?: any): void {
        this.body = body;
    }

    addEventListener(event: 'error' | 'load' | 'progress' | 'readystatechange', handler: Function): void {
        this.listeners[event] = handler as any;
    }

    removeEventListener(event: 'error' | 'load' | 'progress' | 'readystatechange'): void {
        delete this.listeners[event];
    }

    setRequestHeader(name: string, value: string): void {
        this.mockHeaders[name] = value;
    }

    getAllResponseHeaders(): string {
        return this.mockResponseHeaders;
    }

    getResponseHeader(header: string): string | null {
        return new HttpHeaders(this.mockResponseHeaders).get(header);
    }

    mockFlush(status: number, statusText: string, body?: string | object) {
        if (typeof body === 'string') {
            this.responseText = body;
        } else {
            this.response = body;
        }
        this.status = status;
        this.statusText = statusText;
        this.mockLoadEvent();
    }

    mockLoadEvent(): void {
        if (this.listeners.load) {
            this.listeners.load();
        }
    }

    mockErrorEvent(error: any): void {
        if (this.listeners.error) {
            this.listeners.error(error);
        }
    }

    abort() {
        this.mockAborted = true;
    }
}
