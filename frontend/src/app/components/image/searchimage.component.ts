import{Component, OnInit} from '@angular/core'
import {HeaderComponent} from "../common/header/header.component";
import {RouteParams} from '@angular/router-deprecated';
import {SearchService} from "../../services/instagram/SearchService";
import {Post} from "../../models/Post";
import {Spinner} from "../common/spinner/spinner"
import {NewAlbumComponent} from "../album/new-album.component"


@Component({
    selector: 'search-image',
    template: require('../../views/image/searchimage.component.html'),
    directives: [HeaderComponent, Spinner, NewAlbumComponent],
    providers: [SearchService]
})
export class SearchImageComponent implements OnInit {

    searchName:string;
    resultPosts:Post[] = [];
    postCounts:number;
    isLoading:boolean;
    selectedImages:any = [];


    constructor(private searchService:SearchService, private routeParams:RouteParams) {
    }

    ngOnInit() {
        this.loadImages()
    }

    public loadImages(){
        this.searchName = this.routeParams.get('name');
        if (this.searchName) {
            this.isLoading = true;
            this.searchService.getSearchResult(this.searchName).subscribe((posts)=> {
                posts.forEach((post)=> {
                    let resultPost = new Post();
                    resultPost.imageUrl = post['images']['low_resolution']['url'];
                    resultPost.likes = post['likes']['count'];
                    resultPost.link = post['link'];
                    resultPost.userName = post['user']['full_name'];
                    resultPost.profilePicture = post['user']['profile_picture'];
                    this.resultPosts.push(resultPost);
                });
                this.postCounts = this.resultPosts.length;
                this.isLoading = false;
            }, (error)=> {
                console.log('error', error);
            });
        }
    }

    toggleSelection(event:any) {
        var image = event.target;
        var currentTarget = event.currentTarget;

        if (currentTarget.className == "card") {
            // select
            this.selectedImages.push(image.src);
            currentTarget.className += " selected-image-holder";
        } else {
            // unselect
            var index = this.selectedImages.indexOf(image.src);
            if (index > -1) {
                this.selectedImages.splice(index, 1);
            }
            currentTarget.className = "card";
        }
    }

    // TODO: Remove this when we're done
    // get selectedImageDiagnostic() {
    //     return JSON.stringify(this.selectedImages);
    // }
}
