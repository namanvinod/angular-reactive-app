
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RequestService } from './service/request.service';
import { Observable, pipe, Subject } from 'rxjs';
import { map, switchMap, reduce, tap } from 'rxjs/Operators';

@Component({
    selector: 'request-dashboard',
    templateUrl: './request-dashboard.component.html'
})
export class RequestDashboardComponent implements OnInit {

    requestForm: FormGroup;
    constructor(private requestService: RequestService) { }

    orderDetail: object = null;

    requests$ = this.requestService.requests$;

    private _viewRequestDetail = new Subject<number>();
    // private _viewOrderDetail$ = this._viewOrderDetail.asObservable();

    requestDetail$ = this.requests$
        .pipe(
            switchMap(
                () => this._viewRequestDetail, (reqList, reqId) => {
                    console.log('Inside Req Detail Observable');
                    return reqList.find(r => r.requestId === reqId)
                }
            )
        );

    loadData(): void { }

    // assignedToFilter$ = this.requests$
    //     .pipe(
    //         map(m => m.reduce(
    //                     (acc, curr) => [...acc, curr.assignedTo]//new Set([...acc, curr.assignedTo])
    //                     ,[]
    //                 )
    //         ),
    //         tap( t => console.log(t)),
    //         map( m=> m.reduce(
    //             (acc, curr) => {
    //                 console.log(acc, curr)
    //                 acc[curr] = (acc[curr] || 0) + 1
    //                 return acc
    //             }, {}
    //         )),
    //         tap(t => console.log(t)),
    //         map(m=> [ ])
    //     )
    // reduce((acc, curr) => acc = curr))
    //         console.log(acc)
    //         var req = acc.find(f => f.assignedTo === curr);
    //         if (req) {
    //             ++req.total;
    //         }
    //         else {
    //             acc.push({
    //                 assignedTo: curr,
    //                 total: 1
    //             })
    //         }
    //         acc[0].total++;
    //         return acc;
    //     }, [ { assignedTo: 'All', total: 0 }]
    //     )
    // }));
    assignedToFilter$ = this.requests$
        .pipe(
            map(req => {
                // return req.reduce((acc, curr) => { 
                //     console.log(acc)
                //     return new Set([ ...acc, curr.assignedTo ])
                // }, [] )
                // return req.reduce((acc, curr) => {
                //     console.log(acc)
                //     var req = acc.find(f => f.assignedTo === curr.assignedTo);
                //     if (req) {
                //         ++req.total;
                //     }
                //     else {
                //         acc.push({
                //             assignedTo: curr.assignedTo,
                //             total: 1
                //         })
                //     }
                //     acc[0].total++;
                //     return acc;
                // }, [ { assignedTo: 'All', total: 0 }]
                return req.reduce((acc, curr) => {
                    var req = acc.find(f => f.assignedTo === curr.assignedTo);
                    if (req) {
                        ++req.total;
                    }
                    else {
                        acc.push({
                            assignedTo: curr.assignedTo,
                            total: 1
                        })
                    }
                    acc[0].total++;
                    return acc;
                }, [{ assignedTo: 'All', total: 0 }]
                    // return [
                    //     ...acc,
                    //     {
                    //         assignedTo: curr.assignedTo,
                    //         num: (acc.find(f => f.assignedTo === curr.assignedTo) || { num: -1 }).num + 1
                    //     }
                    // ]
                    // curr = [ ...curr, acc.assignedTo ]
                    // }, [{ assignedTo: '', num: 0 }])
                )
            }));

    ngOnInit() {
        this.requestForm = new FormGroup({
            assignedTo: new FormControl('Naman', Validators.required),
            priority: new FormControl(5),
            desc: new FormControl('Test Desc'),
            requestor: new FormControl('')
        })
    }

    viewRequestDetails(requestId: number) {
        console.log('View Request Details', requestId)
        this._viewRequestDetail.next(requestId);
    }

    onSubmit() {
        console.log(this.requestForm.value);
        this.requestService.addRequest(this.requestForm.value).subscribe(
            response => console.log('Response', response)
        );
    }


}