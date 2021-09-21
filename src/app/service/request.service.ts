import { Observable, of } from "rxjs";
import { tap } from 'rxjs/Operators';

import { SubjectSubscriber } from "rxjs/internal/Subject";
import { Injectable, Optional, SkipSelf } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RequestService {

    requests: any[] = [
        { assignedTo: 'Naman', priority: 4, desc: 'Test Req 1', requestor: 'Req1' },
        { assignedTo: 'Naman', priority: 7, desc: 'Test Req 2', requestor: 'Req2' },
        { assignedTo: 'Naman', priority: 5, desc: 'Test Req 3', requestor: 'Req1' },
        { assignedTo: 'John', priority: 4, desc: 'Test Req 4', requestor: 'Req3' },
        { assignedTo: 'Naman', priority: 10, desc: 'Test Req 5', requestor: 'Req1' }
    ]

    constructor(private http: HttpClient, @SkipSelf() @Optional() reqService: RequestService) { }

    addRequest(request): Observable<any> {
        console.log(request);
        // this.requests.push(request);
        return this.http.post('http://localhost:1010/api/request', request)
            //     .pipe(
            //         tap(res => console.log('Response', res)
            // )
        // );
        //     console.log('Teste')
        // return of(true);
    }

    getRequest(): Observable<any> {
        this.http.get('http://localhost:1010/api/request')
                .pipe(
                    tap(res => console.log('Response', res)
            ));
        return of(true);
    }

    requests$ = this.http.get<any[]>('http://localhost:1010/api/request');
    // requests$ = of(this.requests)
}