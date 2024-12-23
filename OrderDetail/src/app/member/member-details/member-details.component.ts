import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../_services/member.service';
import { Member } from '../../_models/member';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery'

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  member?: Member;
  images: GalleryItem[] = [];

  ngOnInit(): void {
    this.loadMember();

  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;

    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        member.photos.map(x => {
          this.images.push(new ImageItem({ src: x.url, thumb: x.url }))
        }
        )
      }
    })

  }

}
