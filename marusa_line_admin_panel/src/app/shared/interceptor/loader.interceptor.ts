import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';


export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loader = inject(LoaderService);
  loader.show(); 
  console.log('asdasddas')

  return next(req).pipe(
    finalize(() => loader.hide())
  );
};
