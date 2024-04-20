import {Router} from "express";
const router:Router= Router();

import * as controller from "../../controllers/client/tour.controller"

router.get("/",controller.index);
router.get("/:slugCategory",controller.detailCategory);
router.get("/detail/:slugTour",controller.detailTour);

export const tourRoute:Router = router;