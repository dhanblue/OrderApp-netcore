import { HttpInterceptorFn } from '@angular/common/http';
import { AcccountService } from '../_services/acccount.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const accountService = inject(AcccountService);
  if (accountService.currentUser()) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${accountService.currentUser()?.token}` } });

  }
  return next(req);
};
